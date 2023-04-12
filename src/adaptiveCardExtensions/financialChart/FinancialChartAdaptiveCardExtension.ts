import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { FinancialChartPropertyPane } from './FinancialChartPropertyPane';
import { ChartView } from './quickView/ChartView';

export interface IFinancialChartAdaptiveCardExtensionProps {
  title: string;
}

export interface IFinancialChartAdaptiveCardExtensionState {
  description: string;
  chartURL: string;
  title:string;
}

const CARD_VIEW_REGISTRY_ID: string = 'FinancialChart_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'FinancialChart_QUICK_VIEW';
export const CHART_VIEW_REGISTRY_ID: string = 'FinancialChart_CHART_VIEW';
export const DETAILS_VIEW_REGISTRY_ID: string = 'FinancialChart_DETAILS_VIEW';

export default class FinancialChartAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IFinancialChartAdaptiveCardExtensionProps,
  IFinancialChartAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: FinancialChartPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      description: "",
      chartURL: "",
      title:""
     };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
    //this.quickViewNavigator.register(DETAILS_VIEW_REGISTRY_ID, () => new QuickView());
    this.quickViewNavigator.register(CHART_VIEW_REGISTRY_ID, () => new ChartView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'FinancialChart-property-pane'*/
      './FinancialChartPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.FinancialChartPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
