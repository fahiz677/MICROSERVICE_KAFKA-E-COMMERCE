import { Kafka, Message } from "kafkajs";

export class KafkaConsumer {
  consumer;
  constructor(groupId:string) {
    const kafka = new Kafka({
      clientId: "app2",
      brokers: ["localhost:9092"],
    });

    this.consumer = kafka.consumer({ groupId: groupId });
  }

  connectConsumer(topic: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic });
        await this.consumer.run({
          eachMessage: async ({ message }: { message: Message }) => {
            const data = message.value?.toString();
            console.log(data);
            
            // resolve(data);
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        await this.consumer.stop();
      }
    });
  }

  stopConsumer() {
    this.consumer.disconnect();
  }
}
