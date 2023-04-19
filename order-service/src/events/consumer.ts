import { Kafka, Message } from "kafkajs";
import { emitter }  from '../eventEmitter'
export class KafkaConsumer {
  consumer;
  constructor(groupId: string) {
    const kafka = new Kafka({
      clientId: "app2",
      brokers: ["localhost:9092"],
    });

    this.consumer = kafka.consumer({ groupId: groupId });
  }

  async connectConsumer(topic: string) {
    try {
      
      await this.consumer.connect();
      await this.consumer.subscribe({ topic });
      await this.consumer.run({
        eachMessage: async ({ message }: { message: Message }) => {
          const data = JSON.parse(message.value?.toString());
          emitter.emit(topic, data)

        },
      });
    } catch (error) {}
  }

  stopConsumer() {
    this.consumer.disconnect();
  }
}

// class kafkaConsumer {
//   constructor(grpId) {
//     this.newConsumer = kafka.consumer({ groupId: grpId });
//   }
//   consumerConnectKafkaMethode = async (topic) => {
//     console.log("methoda works topic:=>", topic);
//     await this.newConsumer.connect();
//     await this.newConsumer.subscribe({ topic: topic });
//     console.log("okook");
//     await this.newConsumer.run({
//       eachMessage: async ({ message }) => {
//         let data = JSON.parse(message.value.toString());
//         console.log("each ", data);
//         eventEmiter.emit(topic, data);
//       },
//     });
//   };
// }
