import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Moment } from '../../../Moment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { environment } from '../../../../environment/environment';
import { MessageService } from '../../../services/message.service';
import { CommentsService } from '../../../services/comments.service';
import { Comment } from '../../../Comment';

@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, RouterModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent implements OnInit {
  moment?: Moment
  faEdit = faEdit
  faTimes = faTimes
  baseApiUrl = environment.baseApiUrl

  commentForm!: FormGroup

  constructor(
    private momentService: MomentService,
    private messageService: MessageService,
    private commentService: CommentsService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data))

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    })
  }

  get text() {
    return this.commentForm.get('text')!
  }

  get username() {
    return this.commentForm.get('username')!
  }

  async onSubmit(formDirective: FormGroupDirective) {

    if (this.commentForm.invalid) {
      return;
    }

    const data2 = this.commentForm.value

    data2.momentId = Number(this.moment!.id)

    await this.commentService.createComment(data2).subscribe((comment) => this.moment!.comments!.push(comment.data))

    this.messageService.add('Comentário adicionado!')

    this.commentForm.reset()

    formDirective.resetForm()
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()
    this.messageService.add("Momento excluído com sucesso")
    this.router.navigate(['/'])
  }
}
