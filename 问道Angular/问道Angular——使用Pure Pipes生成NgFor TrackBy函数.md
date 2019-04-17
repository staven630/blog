

# 根据单个键值
> ngFor="let item of items ; trackBy: ( 'id' | trackByProperty )"

```
import {Pipe, PipeTransform} from '@angular/core';

interface TrackByFunctionCache {
  [propertyName: string]: <T>(index: number, item: T) => any;
}

// 缓存相同propertyName生成的TrackBy函数
const cache: TrackByFunctionCache = Object.create(null);

@Pipe({
  name: 'trackByProperty',
  pure: true
})
export class TrackByPropertyPipe implements PipeTransform {
  // 返回一个TrackBy函数
  public transform(propertyName: string) {
    console.warn( `Getting track-by for [${ propertyName }].` );
    if (!cache[propertyName]) {
      cache[propertyName] = function trackByProperty<T>(index: number, item: T): any {
        return item[propertyName];
      };
    }
    return cache[propertyName];
  }
}
```

```
<ul class="heroes">
  <ng-template ngFor let-hero [ngForOf]="heroes" let-i="index" [ngForTrackBy]="('id' | trackByProperty)">
    <li>
      <a routerLink="/detail/{{hero.id}}">
        <span class="badge">{{hero.id}}</span>{{hero.name}}
      </a>
      <button class="delete" title="delete hero" (click)="delete(hero.id)">x</button>
    </li>
  </ng-template>
</ul>
```

# 多个键值

> ngFor="let item of items ; trackBy: (['id', 'type'] | trackByProperty)"

```
import {Pipe, PipeTransform} from '@angular/core';

interface TrackByFunctionCache {
  [propertyName: string]: <T>(index: number, item: T) => any;
}

// 缓存相同propertyName生成的TrackBy函数
const cache: TrackByFunctionCache = Object.create(null);

@Pipe({
  name: 'trackByProperty',
  pure: true
})
export class TrackByPropertyPipe implements PipeTransform {

  public transform(propertyNames: '$index');
  public transform(propertyNames: string);
  public transform(propertyNames: string[]);
  // 返回一个TrackBy函数
  public transform(propertyNames: any) {
    console.warn( `Getting track-by for [${ propertyNames.toString() }].` );

    let cacheKey = propertyNames;

    if (Array.isArray(propertyNames)) {
      cacheKey = propertyNames.join('->');
      if (!cache[cacheKey]) {
        cache[cacheKey] = function trackByProperty<T>(index: number, item: T): any {
          const values = [];
          for (const propertyName of propertyNames) {
            values.push(item[propertyName]);
          }
          return values.join('->');
        };
      }
    } else if (propertyNames === '$index') {
      if (!cache[cacheKey]) {
        cache[cacheKey] = function trackByProperty<T>(index: number, item: T): any {
          return index;
        };
      }
    } else {
      if (!cache[cacheKey]) {
        cache[cacheKey] = function trackByProperty<T>(index: number, item: T): any {
          return item[propertyNames];
        };
      }
    }
    return cache[cacheKey];
  }
}
```

```
<ul class="heroes">
  <ng-template ngFor let-hero [ngForOf]="heroes" let-i="index" [ngForTrackBy]="(['id', 'type'] | trackByProperty)">
    <li>
      <a routerLink="/detail/{{hero.id}}">
        <span class="badge">{{hero.id}}</span>{{hero.name}}
      </a>
      <button class="delete" title="delete hero" (click)="delete(hero.id)">x</button>
    </li>
  </ng-template>
</ul>
```