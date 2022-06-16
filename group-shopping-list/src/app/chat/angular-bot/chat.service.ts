import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) {}
}
@Injectable()
export class ChatService {
  constructor() {}
  conversation = new Subject<Message[]>();
  messageMap = {
    Hi: 'Hello',
    'Who are you': 'My name is Healthy-U Service Bot',
    'What is your role': 'Just guide for the user',
    templateResp:
      "I can't understand your text. For additional help please contact our team.",
  };
  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }
  getBotMessage(question: string) {
    let answer = this.messageMap[question];
    return answer || this.messageMap['templateResp'];
  }
}
