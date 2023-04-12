import { BaseAdaptiveCardView,  ISPFxAdaptiveCard } from '@microsoft/sp-adaptive-card-extension-base'; //IActionArguments,
//import { IHelloWorldAdaptiveCardExtensionProps, IHelloWorldAdaptiveCardExtensionState } from '../HelloWorldAdaptiveCardExtension';
import { IFinancialChartAdaptiveCardExtensionProps, IFinancialChartAdaptiveCardExtensionState } from '../FinancialChartAdaptiveCardExtension';
export interface IDetailedViewData {
  title: string;
  description: string;
  details: string;
  chartUrl: string;
}

export class DetailedView extends BaseAdaptiveCardView<
IFinancialChartAdaptiveCardExtensionProps,
  IFinancialChartAdaptiveCardExtensionState,
  IDetailedViewData
> {
  public get data(): IDetailedViewData {
    //const { description, title } = this.state.standingsData[this.state.standingCurrentIndex];
    return {
        title: 'Detailed View',
        description: this.state.description,
        chartUrl: this.state.chartURL,
      details: 'More details'
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/DetailedQuickViewTemplate.json');
  }
}