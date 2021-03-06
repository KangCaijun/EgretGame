//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private progressMask:egret.Shape;
    private textField: egret.TextField;

    private onAddToStage(event:egret.Event):void{
        this.createView();
    }

    private createView(): void {
        let pscale =  750 / this.stage.stageWidth;
        let midY =  this.stage.stageHeight * pscale * 0.5;

        let bg = CommonUtils.BitmapUtils.createBitmapByName("loading_bg_jpg");
        this.addChild(bg);


        this.textField = new egret.TextField();        
        this.addChild(this.textField);
        this.textField.fontFamily = "黑体";
        this.textField.size = 28;
        this.textField.y = midY + 80;
        this.textField.width = 750;
        this.textField.textAlign = "center";

        let progressBarBg = new egret.Sprite();
        this.addChild(progressBarBg);
        progressBarBg.graphics.beginFill(0x33565e);
        progressBarBg.graphics.drawRoundRect(0,0,530,68,70,70);
        progressBarBg.graphics.endFill();
        progressBarBg.y = midY + 116;
        progressBarBg.x = 110;


        let logo = CommonUtils.BitmapUtils.createBitmapByName("game_logo_png");
        this.addChild(logo);
        logo.x = (750 - logo.width) / 2;
        logo.y = midY - logo.height - 50;
        
        let mcTexture = RES.getRes("loadingAnimate_png");
        let mcData = RES.getRes("loadingAnimate_json");
        let loadingDataFactory = new egret.MovieClipDataFactory(mcData,mcTexture);
        let progressBarFront:egret.MovieClip = new egret.MovieClip(loadingDataFactory.generateMovieClipData("loading"));
        this.addChild(progressBarFront);
        progressBarFront.gotoAndPlay(1,-1);
        progressBarFront.y = midY + 120;
        progressBarFront.x = 117;
    }

    public onProgress(current: number, total: number): void {
    }

    public setLoadingText(txt:string) :void{
        this.textField.text = txt;
    }
}
