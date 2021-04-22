
# 原理
1. 每次比较相邻两个元素的大小，若前者大于后者，则交换其位置
2. 第一轮循环找出最大值后，再次循环找出次大值。
3. 如此如此，直至没有任何一对数字需要比较

# 时间复杂度
&emsp;&emsp;n代表排序元素长度，C表示比较次数，M表示移动次数。
* 若初始状态是正序的，一轮遍历即可完成排序。
> C<sub>min</sub> = n - 1，M<sub>min</sub> = 0

&emsp;&emsp;这种状态下，是冒泡排序最好的时间复杂度：<span style="color: red;"><b>O(n)</b></span>

* 若初始状态是反序的，需要n-1轮遍历，每次遍历需要n - i次比较，每次比较需要移动3次位置。
> C<sub>max</sub> = n(n - 1) / 2 = O(n<sup>2</sup>)，M<sub>max</sub> = 3n(n - 1) / 2 = O(n<sup>2</sup>)

&emsp;&emsp;这种状态下，是冒泡排序最差的时间复杂度：<span style="color: green;"><b>O(n<sup>2</sup>)</b></span>

&emsp;&emsp;因此，冒泡排序总的平均时间复杂度是：<span style="color: green;"><b>O(n<sup>2</sup>)</b></span>。

# 与插入排序比较
&emsp;&emsp;冒泡排序与插入排序的运行时间相等，但需要的交换次数却很大不同。

&emsp;&emsp;冒泡排序最多需要(n<sup>2</sup>)次交换,而插入排序只需要O(n<sup>2</sup>)次交换。因此要避免使用冒泡排序，而用插入排序取代之。


# 代码示例
> JavaScript

```js
function bubbleSort(arr) {
    let temp;
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let flag = true; 
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = false;
            }
        }
        if (flag) { // 第一轮排序完，都未发生交换位置，说明arr是正序排列的
            break;
        }
    }
    return arr;
}

console.log(bubbleSort([5, 9, 1, 9, 5, 3, 7, 6, 1]));
```

> Java

```java
public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {5, 9, 1, 9, 5, 3, 7, 6, 1};
        System.out.println(Arrays.toString(BubbleSort.sort(arr)));
    }

    public static int[] sort(int[] arr) {
        int temp;
        for (int i = 0; i < arr.length; i++) {
            boolean flag = true;
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    flag = false;
                }
            }

            if (flag) {
                break;
            }
        }
        return arr;
    }
}
```