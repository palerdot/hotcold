//start of Hotcold object

var Hotcold = {

    layout: "qwerty",

    key_interval: 0,
    hits: 0,
    correct: 0,
    seconds_elapsed: 0,

    course_started: false,
    course_init: false,
    course_first_time: true,
    course_completed: false,

    timer_id: 0,
    key_gap_timer_id: 0,

    word_speed: 0,
    gross_speed: 0,
    net_speed: 0,
    accuracy: 100,

    timer_speed_step: 3,

    prev_pattern: 0,
    prev_key: 0,
    right_shift: false,
    left_shift: false,
    
    curr_course: 0,

    canvas_normal_line: '#f2f2f2',
    canvas_ref_line: '#bfbfbf',

    canvas_a: {
        x: 0,
        y: 0,

        old_x: 0,
        old_y: 0,

        timer: 0,

        arr_x: [ ],
        arr_y: [ ],

        // used for mapping the  coordinates when dimensions change
        ref_width: [],
        ref_height: [],

        // last reference values
        last_ref_width: 0,
        last_ref_height: 0,

        width: 0,
        height: 0
    },

    canvas_b: {
        x: 0,
        y: 0,

        old_x: 0,
        old_gross_y: 0,
        old_net_y: 0,
        timer: 0,

        width: 0,
        height: 0,

        arr_gross_x: [ ],
        arr_gross_y: [ ],

        arr_net_x: [ ],
        arr_net_y: [ ],

        // used for mapping the  coordinates when dimensions change
        ref_width: [],
        ref_height: []
    },

    canvas_c: {
        width: 0,
        height: 0
    },

    reset: function ( ) {
        this.key_interval = 0;
        this.hits = 0;
        this.correct = 0;
        this.seconds_elapsed = 0;
        this.course_started = false;
        this.course_init = false;
        this.course_first_time = true;
        this.course_completed = false;
        this.timer_id = 0;
        this.key_gap_timer_id = 0;
        this.word_speed = 0;
        this.gross_speed = 0;
        this.net_speed = 0;
        this.accuracy = 100;
        this.prev_pattern = 0;
        this.prev_key = 0;
        this.right_shift = false;
        this.left_shift = false;
        this.canvas_a.x = 0;
        this.canvas_a.y = 0;
        this.canvas_a.old_x = 0;
        this.canvas_a.old_y = 0;
        this.canvas_a.timer = 0;
        this.canvas_a.arr_x = [ ];
        this.canvas_a.arr_y = [ ];
        this.canvas_b.x = 0;
        this.canvas_b.y = this.canvas_b.height;
        this.canvas_b.old_x = 0;
        this.canvas_b.old_gross_y = this.canvas_b.height;
        this.canvas_b.old_net_y = this.canvas_b.height;
        this.canvas_b.timer = 0;
        this.canvas_b.arr_gross_x = [ ];
        this.canvas_b.arr_gross_y = [ ];
        this.canvas_b.arr_net_x = [ ];
        this.canvas_b.arr_net_y = [ ];
    }
};

module.exports = Hotcold;