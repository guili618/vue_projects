Vue.filter('date',time => moment(time).format('DD/MM/YY ,HH:mm'));
new Vue({
    el: '#notebook',

    data () {
        return {
            //content:  localStorage.getItem('content') || 'You can write in **mark down**',
            notes:JSON.parse(localStorage.getItem('notes')) || [],
            selectedId:localStorage.getItem('selected-id') || null,
        }
    },
    
    computed: {
        notePreview () {
            if (this.selectedId != null){

                return this.selectedNote ? marked(this.selectedNote.content): ''
        }
            //return this.selectedNote ? marked(this.selectedNote.content): ''
            //
        },
        addButtonTitle () {
            return this.notes.length + '本笔记已经就绪' 
        },
        selectedNote () {
            if (this.selectedId != null) {
            return this.notes.find(note => note.id === this.selectedId)
            }
        },
        sortedNotes() {
            return this.notes.slice()
            .sort((a,b) => a.created - b.created)
            .sort((a,b) => (a.favorite === b.favorite) ? 0
             : a.favorite ? -1
             : 1)
        }
    },

    watch:{
        content:{
            handler:'saveNote',
                //(val,oldVal){
                //console.log('new note:',val,'old note:',oldVal)
                //localStorage.setItem('content',val)
            //},
        },
        notes:{
            handler:"saveNotes",
            deep:true,
        },
        selectedId(val) {
            localStorage.setItem('selected-id',val)
        }
    },
    methods:{
        saveNote(){
            console.log('saving note:',this.content)
            localStorage.setItem('content',this.content)
            this.reportOperation('saving')
        },
        reportOperation(opName) {
            console.log('the',opName,'operation wa completed!')
        },
        addNote(){
            const time = Date.now()

            const note = {
                id:String(time),
                title:'New note' + (this.notes.length + 1),
                content:'**Hi** this is a new note',
                created:time,
                favorite:false,
            }

            this.notes.push(note)
        },
        selectNote(note) {

                this.selectedId = note.id
        
        },
        saveNotes () {
            localStorage.setItem('notes',JSON.stringify(this.notes))
            console.log('Notes saved!',new Date())
        },
        removeNote () {
            if(this.selectedNote && confirm('Delete the notes')){
                const index = this.notes.indexOf(this.selectedNote)
                if (index != -1){
                    this.notes.splice(index,1)
                }
            }
        },
        favoriteNote () {
            //this.selectedNote.favorite = !this.selectedNote.favorite
            this.selectedNote.favorite ^= true
        }

    },

    // created() {
        // this.content = localStorage.getItem('content') || 'You can write in **mark down**'
    // },
})




console.log('restored note:',localStorage.getItem('content'));
//const html = marked('**Bold** *Italic* [link] (http://vuejs.org)');
//console.log(html);

