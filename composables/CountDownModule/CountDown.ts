import { OptionType } from '../TypeSystem'
export class CountDown {
    // 變數 - 時間計時器
    public TimdId: any;  
    
    SetTimeOut(time: number): Promise<string> {
        return new Promise((resolve, reject)=> {
            // this.AddEventListener()
            var timeId = setTimeout(()=>{
                console.log('倒數計時結束')
                resolve(OptionType.TimeOut)
                clearTimeout(timeId)
            },time)
            
            this.TimdId = timeId

            // 監聽器
            $('#attack').click(()=> {
                resolve(OptionType.Attack)
                clearTimeout(this.TimdId)
            })
            $('#offense').click(()=> {
                resolve(OptionType.Offense)
                clearTimeout(this.TimdId)
            })

        })
    }
    // AddEventListener():void {
    //     $('#attack').click(()=> {
    //         this.result = OptionType.Attack
    //         // clearTimeout(this.TimdId)
    //     })
    //     $('#offense').click(()=> {
    //         this.result = OptionType.Offense
    //         // clearTimeout(this.TimdId)
    //     })
    // }
}