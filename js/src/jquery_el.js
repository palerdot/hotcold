// all the jquery elements of the Hotcold app
var $el = {
    c_home: $( '#back_to_course_button' ),
    lv: $( '#lesson_view' ),
    c_win: $( '#course_window' ),
    c_tab: $( '#course_tab' ),
    c_course: $( '#create_course_tab' ),
    d_theme: $( '#day_theme' ),
    n_theme: $( '#night_theme' ),
    keys: $( '.keys' ),
    f_canvas_holder: $( '#finger_canvas_holder' ),
    f_span_holder: $("#fin_spans"),
    backlit: $( '.backlit' ),
    s_block: $( '#saved_block' ),
    course_time: $( '#course_time' ),
    cli: $( '#custom_lesson_input' ),

    nav_bar: $("#hotcold-navigation-bar"),

    fs_toggle: $("#fullscreen-toggle"),
    
    canvas_a: $( '#a' ),
    canvas_b: $( '#b' ),
    c_div: $( "#c" ),
    c_section: $(".c_section"),

    scroll_thumb: $("::-webkit-scrollbar-thumb"),
    scroll_bar: $("::-webkit-scrollbar"),

    dtp: $( '#day_theme_preview' ),
    ntp: $( '#night_theme_preview' ),

    lc_temp: $( '#launch_course_temp' ),

    lc1: $( '#launch_course_1' ),
    lc2: $( '#launch_course_2' ),
    lc3: $( '#launch_course_3' ),
    lc4: $( '#launch_course_4' ),
    lc5: $( '#launch_course_5' ),
    lc6: $( '#launch_course_6' ),
    lc7: $( '#launch_course_7' ),
    lc8: $( '#launch_course_8' ),
    lc9: $( '#launch_course_9' ),
    lc10: $( '#launch_course_10' ),
    lc11: $( '#launch_course_11' ),
    lc12: $( '#launch_course_12' ),
    lc13: $( '#launch_course_13' ),
    lc14: $( '#launch_course_14' ),
    lc15: $( '#launch_course_15' ),
    lc16: $( '#launch_course_16' ),
    lc17: $( '#launch_course_17' ),
    lc18: $( '#launch_course_18' ),

    lp: $( '#launch_poem' ),
    lq1: $( '#launch_quote_1' ),
    lq2: $( '#launch_quote_2' ),
    lq3: $( '#launch_quote_3' ),

    pause_button: $("#pause_button"),
    resume_button: $("#resume_button"),

    completed_button: $("#completed_button"),
    completed_div: $("#completed"),

    redo_course: $( '#redo_button' ),
    abort: $( '#abort_button' ),

    custom_lesson: $( '#custom_lesson_input' ),
    char_length: $( '#total_characters' ),
    no_input: $( '#no_input_error' ),
    prepare_lesson: $( '#custom_lesson_launch' ),
    sp1: $( '#show_all_key_page_1' ),
    sp2: $( '#show_all_key_page_2' ),
    akp1: $( '#all_key_page_1' ),
    akp2: $( '#all_key_page_2' ),

    space: $( '#key_32' ),
    space_to_start: $( '#space_to_start' ),
    space_to_resume: $( '#space_to_resume' ),

    $min_div: $( '#min' ),
    $sec_div: $( '#sec' ),

    type_speed: $("#type_speed"),
    net_type_speed: $("#net_type_speed"),
    accuracy: $("#accuracy"),

    ci: $( '#completion_indicator' ),
    ts: $( '#time_saved' ),
    c_label: $("#c_label"),

    finger_1: $( '#fin_1' ),
    finger_2: $( '#fin_2' ),
    finger_3: $( '#fin_3' ),
    finger_4: $( '#fin_4' ),
    finger_5: $( '#fin_5' ),
    finger_6: $( '#fin_6' ),
    finger_7: $( '#fin_7' ),
    finger_8: $( '#fin_8' ),
    finger_9: $( '#fin_9' ),
    finger_10: $( '#fin_10' ),

    finger: $( '.finger' )

};

module.exports = $el;
