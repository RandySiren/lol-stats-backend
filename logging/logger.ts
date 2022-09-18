const winston = require('winston');
const config = require('../conf/config');

export default class Logger {

    private logger: any;
    
    constructor(logger: any) {
        this.logger = logger;
    }
    
    public logMetric(metricName:string, metadata:any):void {
        this.logger.info(metricName, metadata);
    }

    public info(message:string):void {
        this.logger.info(message);
    }

    public debug(message:string):void {
        this.logger.debug(message);
    }

    public error(message:string):void {
        this.logger.error(message);
    }

    public static getLogger(fileName: string):Logger {
        
        if(config.environment === "dev") {
            let logConfiguration = {
                level: config.logLevel,
                transports: [
                  new winston.transports.Console(),
                ],
                format: winston.format.combine(
                    winston.format.label({
                        label: fileName,
                    }),
                    winston.format.timestamp({
                       format: 'MMM-DD-YYYY HH:mm:ss:SSS'
                    }),
                    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
                    winston.format.printf(info => `${[info.timestamp]} - ${info.label}: ${info.level} --- ${info.message} --- ${JSON.stringify(info.metadata)}`),
                    winston.format.splat()
                  )
              }
    
            let logger = winston.createLogger(logConfiguration);
            return new Logger(logger);
        }
        else {
            let logConfiguration = {
                level: config.logLevel,
                transports: [
                  new winston.transports.Console(),
                ],
                format: winston.format.combine(
                    winston.format.label({
                        label: fileName,
                    }),
                    winston.format.metadata({ fillExcept: ['message', 'level', 'label'] }),
                    winston.format.json()
                  )
              }
    
            let logger = winston.createLogger(logConfiguration);
            return new Logger(logger);
        }
    }
}