import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  timestamp: Date;
  sender: 'me' | 'other';
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages: Message[] = [];
  newMessage: string = '';

  constructor() {
    // Sample messages
    this.messages = [
      { text: 'Hello!', timestamp: new Date('2024-07-21T10:00:00'), sender: 'other' },
      { text: 'Hi there!', timestamp: new Date('2024-07-21T10:01:00'), sender: 'me' },
      { text: 'How are you?', timestamp: new Date('2024-07-21T10:02:00'), sender: 'other' },
      { text: 'I\'m good, thanks! How about you?', timestamp: new Date('2024-07-21T10:03:00'), sender: 'me' },
      { text: 'I\'m doing well too. What are you up to?', timestamp: new Date('2024-07-21T10:04:00'), sender: 'other' },
      { text: 'Just working on a project. You?', timestamp: new Date('2024-07-21T10:05:00'), sender: 'me' },
      { text: 'Same here. Just taking a break.', timestamp: new Date('2024-07-21T10:06:00'), sender: 'other' },
      { text: 'Nice! What kind of project are you working on?', timestamp: new Date('2024-07-21T10:07:00'), sender: 'me' },
      { text: 'It\'s a web development project. How about you?', timestamp: new Date('2024-07-21T10:08:00'), sender: 'other' },
      { text: 'I\'m working on a chat app. Just testing some features.', timestamp: new Date('2024-07-21T10:09:00'), sender: 'me' },
      { text: 'That sounds interesting! Good luck with it.', timestamp: new Date('2024-07-21T10:10:00'), sender: 'other' },
      { text: 'Thanks! Appreciate it.', timestamp: new Date('2024-07-21T10:11:00'), sender: 'me' }
    ];
  }

  refresh() {
    // Refresh logic here
    console.log('Refresh clicked');
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        timestamp: new Date(),
        sender: 'me'
      });
      this.newMessage = '';
    }
  }

  adjustTextareaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, parseInt(getComputedStyle(textarea).lineHeight) * 4) + 'px';
  }
}
