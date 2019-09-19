import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BodyLinkComponent } from "./components/body-link/body-link.component";
import { StageComponent } from "./components/stage/stage.component";
import { StageSlotComponent } from "./components/stage-slot/stage-slot.component";
import { AppleComponent } from "./components/apple/apple.component";

@NgModule({
  declarations: [
    AppComponent,
    BodyLinkComponent,
    StageComponent,
    StageSlotComponent,
    AppleComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
