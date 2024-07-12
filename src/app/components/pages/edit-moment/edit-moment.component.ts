import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-edit-moment',
  standalone: true,
  imports: [NgIf, MomentFormComponent],
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent implements OnInit {
  moment!: Moment
  btnText: string = "Editar"

  constructor(
    private messageService: MessageService,
    private momentService: MomentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data
    })
  }

  async editHandler(moment: Moment) {
    const id = Number(this.moment.id)

    const formData = new FormData()

    formData.append("title", moment.title)
    formData.append("description", moment.description)

    if (moment.image) {
      formData.append("image", moment.image)
    }

    await this.momentService.updateMoment(id!, formData).subscribe()
    this.messageService.add('Momento editado com sucesso!')
    this.router.navigate(['/'])
  }
}
