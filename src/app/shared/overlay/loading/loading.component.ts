import { Component, OnInit } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
    private $overlay: OverlayService
  ) { }

  public isLoading = false;

  ngOnInit(): void {
    this.$overlay.loadingQueue$.subscribe(
      queue => setTimeout(() => this.isLoading = queue.size > 0, 0)
    );
  }

}
