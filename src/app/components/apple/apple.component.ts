import { Component, OnInit, Input } from "@angular/core";
import { AppleModel } from "src/app/model/apple.class";

@Component({
  selector: "app-apple",
  templateUrl: "./apple.component.html",
  styleUrls: ["./apple.component.scss"]
})
export class AppleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  @Input() apple: AppleModel;
  @Input() module: number;
}
