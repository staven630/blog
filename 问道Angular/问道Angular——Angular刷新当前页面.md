# onSameUrlNavigation
&emsp;&emsp;从angular5.1起提供onSameUrlNavigation来支持路由重新加载。、

&emsp;&emsp;有两个值'reload'和'ignore'。默认为'ignore'

&emsp;&emsp;定义当路由器收到一个导航到当前 URL 的请求时应该怎么做。 默认情况下，路由器将会忽略这次导航。但这样会阻止类似于 "刷新" 按钮的特性。 使用该选项可以配置导航到当前 URL 时的行为。

# 使用
### 配置onSameUrlNavigation
```
@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { onSameUrlNavigation: 'reload' }
  )],
  exports: [RouterModule]
})
```
&emsp;&emsp;reload实际上不会重新加载路由，只是重新出发挂载在路由器上的事件。
### 配置runGuardsAndResolvers
&emsp;&emsp;runGuardsAndResolvers有三个值：
* paramsChange: 仅在路由参数更改时触发。如/reports/:id 中id更改
* paramsOrQueryParamsChange: 当路由params参数更改或query参数更改时触发。如/reports/:id/list?page=23中的id或page属性更改
* always ：始终触发
```
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'report-list', component: ReportListComponent },
      { path: 'detail/:id', component: ReportDetailComponent, runGuardsAndResolvers: 'always' },
      { path: '', redirectTo: 'report-list', pathMatch: 'full' }
    ]
  }
];
```
### 组件监听router.events
```
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Report} from '@models/report';
import {ReportService} from '@services/report.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit, OnDestroy {
  report$: Observable<Report>;
  navigationSubscription;

  constructor(
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.initLoad(event);
      }
    });
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.report$ = this.reportService.getReport(id);
  }

  ngOnDestroy(): void {
    // 销毁navigationSubscription，避免内存泄漏
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  initLoad(e) {
    window.scrollTo(0, 0);
    console.log(e);
  }
}
```