&emsp;&emsp;[流(stream)](http://nodejs.cn/api/stream.html)是 Node.js 中处理流式数据的抽象接口。stream 模块用于构建实现了流接口的对象。

## 流的类型

&emsp;&emsp;Node.js 有四种基本的流类型：

- Readable - 可读取数据的流。
- Writable - 可写入数据的流。
- Duplex - 可读又可写的流。
- Transform - 在读写过程中可以修改或转换数据的 Duplex 流。

## Readable：可读流

&emsp;&emsp;[可读流](http://nodejs.cn/api/stream.html#stream_readable_streams)用于从底层源读取数据。如果应用程序消耗 buffer 的速度比从源读的速度慢，则数据可以存储在可读流中。
![可读流](../img/readableStream.png)

## Writable：可写流

&emsp;&emsp;[可写流](http://nodejs.cn/api/stream.html#stream_writable_streams)用于将数据从应用程序写入特殊目的地。在写入慢的情况下，为了防止数据丢失或目的地过载，则数据可以存储在内部 Buffer 中。
![可写流](../img/writableStream.png)

## 双工流

## 缓冲

&emsp;&emsp;可写流和可读流都会在内部的缓冲器中存储数据，可以分别使用的 writable.writableBuffer 或 readable.readableBuffer 来获取。
