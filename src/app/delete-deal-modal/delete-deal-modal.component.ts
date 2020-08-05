import { Component, OnInit, Output, EventEmitter ,Input} from '@angular/core';

@Component({
  selector: 'app-delete-deal-modal',
  templateUrl: './delete-deal-modal.component.html',
  styleUrls: ['./delete-deal-modal.component.scss']
})
export class DeleteDealModalComponent implements OnInit {
  @Output() modalClosedDel = new EventEmitter<boolean>();
  @Input() message:string;
  constructor() { }

  ngOnInit() {
  }
  emitCloseModal(){
    this.modalClosedDel.emit(false);
  }
}