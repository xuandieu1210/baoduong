export class PageItem {
    title: string;
    pageName: string;
    tabComponent: string;
    pageIndex: string;
    appType: string;
    icon: string;
    color: string;
    token: string;


    constructor(title: string, pageName: string, tabComponent: string, pageIndex: string, appType: string,
        icon: string, color: string, token: string) {
        this.title = title;
        this.pageName = pageName;
        this.tabComponent = tabComponent;
        this.pageIndex = pageIndex;
        this.appType = appType;
        this.icon = icon;
        this.color = color;
        this.token = token;
    }
}