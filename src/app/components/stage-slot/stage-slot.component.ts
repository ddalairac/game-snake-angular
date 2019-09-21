import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-stage-slot",
  templateUrl: "./stage-slot.component.html",
  styleUrls: ["./stage-slot.component.scss"]
})
export class StageSlotComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  @Input() module: number;
}
