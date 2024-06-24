import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
@Injectable(
  {providedIn: 'root'}
)
export class SignalRService{

  private hubconnection!: signalR.HubConnection;

  constructor(){
    //Build the hub connection
    this.hubconnection= new signalR.HubConnectionBuilder()
                                      .withUrl('https://localhost:5001/chathub')
                                      .build();
  }

  public startConnection(){

    console.log("Starting connection");
    this.hubconnection
            .start()
            .then(()=>console.log('Connection started'))//log success
            .catch(err=>console.log('Error while starting connection: '+err))//log error
  }

  // Method to add a listener to receive messages
  public addReceiveMessageListener = (callback: (user: string, message: string) => void) => {

    console.log("Adding listener");
    this.hubconnection.on('ReceiveMessage', callback);
  }


  public sendMessage(user:string,message:string){
    console.log("Sending message");
    this.hubconnection
            .invoke('SendMessage',user,message)
            .catch(err=>console.error(err)); //log error
  }
}
