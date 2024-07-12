import { Component } from '@angular/core';
import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';
import { RouterModule, Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-new-moment',
  standalone: true,
  imports: [MomentFormComponent, RouterModule],
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText = 'Compartilhar!'

  constructor(
    private momentService: MomentService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async createHandler(moment: Moment) {
    const formData = new FormData()

    formData.append("title", moment.title)
    formData.append("description", moment.description)

    if (moment.image) {
      formData.append('image', moment.image)
    }

    await this.momentService.createMoment(formData).subscribe()
    this.messageService.add('Momento adicionado com sucesso!')
    this.router.navigate(['/'])
  }
}
