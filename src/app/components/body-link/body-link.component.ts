import { Component, OnInit, Input } from "@angular/core";
import { SnakeModel } from "src/app/model/skake.class";

@Component({
  selector: "app-body-link",
  templateUrl: "./body-link.component.html",
  styleUrls: ["./body-link.component.scss"]
})
export class BodyLinkComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  @Input() link: SnakeModel;
  @Input() module: number;
}
