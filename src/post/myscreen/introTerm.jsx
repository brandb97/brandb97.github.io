import ibm1969 from "./ibm1969.jpg"

function IntroTerm () {
    return (<div>
        <p className="indent">
            终端是什么？如果你熟悉UNIX系统，你也许会说终端就是<code>"/dev/tty"</code>这个设备。的确，从UNIX程序的视角来看，<code>"/dev/tty"</code>和普通的文件没有什么区别（试试cat /dev/tty）。在UNIX系统里，一个程序用<code>open</code>系统调用既可以打开一个文件，也可以打开一个终端设备。<code>open</code>系统调用返回一个整数类型的文件描述符（其实就是一个数组下标），<code>read/write</code>系统调用对这个打开的文件描述符进行读写操作。许多时候，对于一个程序来说，一个文件描述符究竟对应于一个磁盘文件还是属于一个终端设备并不重要，只要可以对这个文件描述符进行读写操作就可以。但是操作系统就需要区分文件描述符对应的设备是什么了。如果是读写硬盘，操作系统需要移动硬盘的磁头读写磁道上的数据；如果是读写终端，操作系统的终端驱动程序则需要等待键盘的输入，或者是把ascii码打印在屏幕上。
        </p>
        <p className="indent">
            所以终端这个名词其实可以对应两种东西：终端设备和终端驱动程序。在很早以前，终端设备，就是指键盘和屏幕，UNIX系统中用<code>"/dev/tty"</code>表示；终端驱动则负责实现在终端设备上的系统调用（e.g. UNIX系统上的open，read，write）。下面是一张古早（1969年，来源于维基百科）人们在终端上工作的相片（也许现在有一些性格变态的书呆子也会这么工作，林子大了什么鸟都有！）
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