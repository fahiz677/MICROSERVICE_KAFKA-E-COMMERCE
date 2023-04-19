import { Kafka, Producer, Message } from "kafkajs";

export class KafkaProducer {
  producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: "app1",
      brokers: ["localhost:9092"],
    });
    this.producer = kafka.producer();
  }

  connectProducer(topic: string, message: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.producer.connect();


        await this.producer.send({
          topic,
          messages: [{ value: message }],
        });
      } catch (error) {
        console.error(error);

      } finally {
        await this.producer.disconnect();

      }
    });
  }
}
