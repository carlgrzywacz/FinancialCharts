import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FinancialChartAdaptiveCardExtensionStrings';
import { IFinancialChartAdaptiveCardExtensionProps, IFinancialChartAdaptiveCardExtensionState, CHART_VIEW_REGISTRY_ID } from '../FinancialChartAdaptiveCardExtension';
//VIX_VIEW_REGISTRY_ID
export interface IQuickViewData {
  subTitle: string;
  title: string;
  charts: any;
}

let chartOptions = require("../charts/Charts.json");

export interface iChart {
  value: number;
  description: string;
  image: string;
  title: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IFinancialChartAdaptiveCardExtensionProps,
  IFinancialChartAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    
    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      charts: chartOptions
    };
  }

  public onAction(action: IActionArguments): void {
    if (action.type === 'Submit') {
        const { id } = action.data;
        if (id === 'chartSelect') {
          const myChart: iChart = chartOptions.find((chart: iChart) => chart.value === action.data.ddlChartOptions);

          this.quickViewNavigator.push(CHART_VIEW_REGISTRY_ID);
          this.setState({
            chartURL: myChart.image,
            description: myChart.description,
            title: myChart.title
          });
        }

    }
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}