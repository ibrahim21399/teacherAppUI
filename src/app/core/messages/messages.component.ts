import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { message } from 'src/app/Model/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessageComponent implements OnInit {
  studentId: string="";
  teacherId: string="";
  messages: message[]=[];
  newMessage: message |any;

  constructor(private route: ActivatedRoute, private messageService: MessageService,private auth:AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['studentId'];
      this.teacherId = params['teacherId'];
      console.log(this.studentId)
      console.log( this.teacherId)

      this.messageService.getMessages(this.studentId, this.teacherId)
        .subscribe(data => {
          this.messages = data;
          console.log(this.messages)
        });
    });
  }

  sendMessage(): void {
    this.newMessage.student = this.studentId;
    this.newMessage.teacher = this.teacherId;
    this.newMessage.sentDate = new Date();
    this.newMessage.isTeacher = false;
    this.messageService.sendMessage(this.newMessage)
      .subscribe(data => {
        this.messages.push(data);
        this.newMessage.message = '';
      });
  }
}