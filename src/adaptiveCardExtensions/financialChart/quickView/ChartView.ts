import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
//import * as strings from 'FinancialChartAdaptiveCardExtensionStrings';
import { IFinancialChartAdaptiveCardExtensionProps, IFinancialChartAdaptiveCardExtensionState } from '../FinancialChartAdaptiveCardExtension';

export interface IChartViewData {
  chartDescription: string;
  chartTitle: string;
  chartUrl: string;
}

export class ChartView extends BaseAdaptiveCardView<
  IFinancialChartAdaptiveCardExtensionProps,
  IFinancialChartAdaptiveCardExtensionState,
  IChartViewData
> {
  public get data(): IChartViewData {
    return {
      chartDescription: this.state.description,
      chartTitle: this.state.title,
      chartUrl: this.state.chartURL
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/ChartViewTemplate.json');
  }
}