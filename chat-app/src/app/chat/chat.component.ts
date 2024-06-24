import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: string = '';
  message: string = '';
  messages: { user: string, message: string }[] = [];

  constructor(private signalRService: SignalRService) { }

  ngOnInit() {
    // Start the connection when the component loads
    this.signalRService.startConnection();
    // Add the listener to receive messages
    this.signalRService.addReceiveMessageListener((user, message) => {
      // Add the received message to the array of messages
      this.messages.push({ user, message });
    });
  }

  sendMessage() {
    // Send the message if the user and message are not empty
    if (this.user && this.message) {
      this.signalRService.sendMessage(this.user, this.message);
      this.message = ''; // Clear the message field after sending
    }
  }
}
