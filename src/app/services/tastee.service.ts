import { Injectable } from '@angular/core';

import { TasteeCore } from 'tastee-core/transpiled/src/app/tastee-core';
import { TasteeReporter } from 'tastee-core/transpiled/src/app/tastee-reporter';
import { TasteeEngine } from 'tastee-core/transpiled/src/app/tastee-engine';
import { TasteeAnalyser } from 'tastee-core/transpiled/src/app/tastee-analyser';
@Injectable()
export class TasteeService {
  core: TasteeCore;

  constructor() {
    this.core = new TasteeCore(new TasteeAnalyser());
  }

  runTastee() {
    this.core.init(new TasteeEngine("chrome"))
    this.core.execute(" driver.get('https://www.google.fr')", "toto").then(function (instructions) {
      this.core.stop();
    });;
  }

  stopTastee() {
    this.core.stop();
  }

}
