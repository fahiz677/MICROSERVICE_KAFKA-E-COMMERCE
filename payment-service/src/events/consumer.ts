import { Kafka, Message } from "kafkajs";
import { emitter }  from '../eventEmitter';

export class KafkaConsumer {
  consumer;
  constructor(groupId:string) {
    const kafka = new Kafka({
      clientId: "app2",
      brokers: ["localhost:9092"],
    });

    this.consumer = kafka.consumer({ groupId: groupId });
  }

  async connectConsumer(topic: string) {
    try {
      console.log("fahiz");
      
      await this.consumer.connect();
      await this.consumer.subscribe({ topic });
      await this.consumer.run({
        eachMessage: async ({ message }: { message: Message }) => {
          const data = JSON.parse(message.value?.toString());
          console.log(data);
          
          emitter.emit(topic, data)

        },
      });
    } catch (error) {}
  }

}
