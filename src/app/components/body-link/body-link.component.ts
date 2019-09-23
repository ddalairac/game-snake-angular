import { Component, OnInit, Input } from "@angular/core";
import { SnakeModel } from "src/app/model/skake.class";
import { GameService } from "src/app/services/game.service";
import { MoveOpt } from "src/app/model/move-options.enum";

@Component({
  selector: "app-body-link",
  templateUrl: "./body-link.component.html",
  styleUrls: ["./body-link.component.scss"]
})
export class BodyLinkComponent implements OnInit {
  constructor(public game: GameService) {}

  ngOnInit() {}
  @Input() link: SnakeModel;
  @Input() module: number;
  @Input() index: number;
}
