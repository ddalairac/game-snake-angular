import { Component, OnInit, Input } from "@angular/core";
import { ElementModel } from "src/app/model/skake.class";

@Component({
  selector: "app-apple",
  templateUrl: "./apple.component.html",
  styleUrls: ["./apple.component.scss"]
})
export class AppleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  @Input() apple: ElementModel;
}
