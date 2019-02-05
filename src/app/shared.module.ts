import { NgModule } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeViewModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgxLineChartModule } from 'ngx-line-chart';




@NgModule({
    imports: [
        ButtonModule,
        ListViewModule,
        DropDownListModule,
        TreeViewModule,
        TabModule,
        RichTextEditorAllModule,
        NgxLineChartModule

    ],

    exports: [
        ButtonModule,
        TreeViewModule,
        ListViewModule,
        DropDownListModule,
        TabModule,
        NgxLineChartModule,
        RichTextEditorAllModule
    ]
})
export class SharedModule { }
