
export class ChatboxTab {
    channelId: number = -1;
    constructor(public name: string) {
        var div = document.getElementById('chatbox');
        var content = document.createElement('div');
        content.setAttribute('id', 'chatboxtab-' + this.name);
        div.appendChild(content);
        this.addText('------------------------------------' + this.name, 0, '');
    }
    addText(text, speaktype, creatureName) {
        /*
        var div = document.getElementById('chatboxtab-' + this.name);
        var content = document.createElement('div');
        content.innerText = creatureName + ', ' + text;
        div.appendChild(content);

        console.log('tab', this.name, text, speaktype, creatureName);
        */
    }
}