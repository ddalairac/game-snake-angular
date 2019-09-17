import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-body-link",
  templateUrl: "./body-link.component.html",
  styleUrls: ["./body-link.component.scss"]
})
export class BodyLinkComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  @Input() y: number;
  @Input() x: number;
  @Input() link: number;
}
