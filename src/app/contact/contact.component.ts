import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  isSubmit = false;
  formData: any;
  response: any;

  getForm(event: any, message: any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    if (this.formData.get("Name") !== "" && this.formData.get("Message") !== "" && this.formData.get("Email") !== "") {
      this.isSubmit = true;
    }
  }

  resetForm(name: any, email : any, message : any) {
    this.isSubmit = false;
    name.value = "";
    email.value = "";
    message.value = "";
  }
}
