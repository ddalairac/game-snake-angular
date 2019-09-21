import { Component, OnInit } from "@angular/core";
import { SnakeModel, AppleModel } from "src/app/model/skake.class";
import { GameService } from "src/app/services/game.service";

@Component({
  selector: "app-stage",
  templateUrl: "./stage.component.html",
  styleUrls: ["./stage.component.scss"]
})
export class StageComponent implements OnInit {
  constructor(public game: GameService) {}

  ngOnInit() {
    this.game.createStage();
    this.game.starGame();
    this.snakeLinks = this.game.snakeLinks;
    this.apples = this.game.apples;
    this.stageSlots = this.game.stageSlots;
  }

  stageSlots: Array<number[]>;
  snakeLinks: SnakeModel[];
  apples: AppleModel[];

  onKeydown(KeyboardEvent: KeyboardEvent): void {
    this.game.newUserEvent(KeyboardEvent);
  }
}
