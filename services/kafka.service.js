import { Kafka } from  'kafkajs'
import { logger } from './logger.service'

export const kafkaService = {
    emitEvent,
}


const kafka = new Kafka({
    clientId: 'fg-user-service',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

async function emitEvent(topic, message) {
    try {
        await producer.send({
            topic,
            messages: [
              {
                value: JSON.stringify(message)
              },
            ]
        })
        logger.debug(`Event emitted to topic "${topic}:"`, message)
    } catch (err) {
        logger.error('Failed to emit Kafka event', err)
        throw err
    }
}

function _defineShutdownHandlers() {
    process.on('SIGINT', async () => {
        logger.info('Shutting down...');
        await producer.disconnect();
        logger.info('Kafka producer disconnected');
        process.exit(0);
    });

    process.on('exit', async () => {
        await producer.disconnect();
        logger.info('Kafka producer disconnected');
    });
}

// Connect producer on service initialization
(async () => {
    try {
        await producer.connect();
        logger.debug('Kafka producer connected')
    } catch (err) {
        logger.error('Cannot Connect to Kafka broker', err)
    }
})();

// Handle graceful shutdown
_defineShutdownHandlers()
