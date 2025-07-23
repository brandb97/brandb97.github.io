import ibm1969 from "./ibm1969.jpg"

function IntroTerm () {
    return (<div>
        <p className="indent">
            终端是什么？其实从UNIX用户的视角来看，终端和普通的文件没有什么区别。在UNIX系统里，一个程序可以用<code>open</code>系统调用既可以打开一个文件，也可以打开一个终端设备。<code>open</code>系统调用返回一个整数类型的文件描述符（其实就是一个数组下标），紧接着你就可以使用<code>read/write</code>系统调用对这个文件描述符进行读写操作。许多时候，对于一个程序来说，一个文件描述符究竟属于一个磁盘文件还是属于一个终端设备并不重要，只要可以对这个文件描述符进行读写操作就可以。但是UNIX系统就需要区分文件描述符对应的设备是什么了。如果是读写硬盘，UNIX系统中的硬盘驱动程序会驱动硬盘的磁头读取磁道上的数据；如果是读写终端，UNIX系统中的终端驱动程序则需要等待键盘的输入，或者是把ascii码打印在屏幕上。
        </p>
        <p className="indent">
            所以终端这个名词其实可以对应两种东西：终端设备和终端驱动程序。在很早以前，终端设备，就是指键盘和屏幕；终端驱动则对中断驱动器编程读取键盘输入，并把字符对应的像素点画到显示器中。下面是一张古早（1969年，来源于维基百科）人们在终端上工作的相片（也许现在有一些性格变态的书呆子也会这么工作，林子大了什么鸟都有！）
        </p>
        <div className="ibm1969-pic">
            <img
                src={ibm1969}
                alt="ibm terminal in 1969"
            >
            </img>
        </div>
        <div className="tips">
            🤔 为什么终端被称为tty？<br/>
            💡 tty的全称是TeleTYpewriter，如果你想了解更多，请看<a
            href="https://zh.wikipedia.org/zh-cn/電傳打字機">电传打印机</a>
        </div>
    </div>)
}

export default IntroTerm;