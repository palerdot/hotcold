// all the jquery elements of the Hotcold app
var $el = {

    body: $("body"),

    guide: $("#help-guide"),
    guide_modal: $("#help-guide-modal"),
    guide_content: $("#help-guide-content"),

    c_home: $( '#back_to_course_button' ),
    lv: $( '#lesson_view' ),
    c_win: $( '#course_window' ),
    c_tab: $( '#course_tab' ),
    c_course: $( '#create_course_tab' ),

    lesson_headers: $(" #lesson-headers "),
    lesson_details: $(" #lesson-details "),

    template_lh: $("#lesson-header-template"),
    template_ci: $( "#course-info-template" ),

    d_theme: $( '#day_theme' ),
    n_theme: $( '#night_theme' ),
    themes: $(".theme"),

    keys: $( '.keys' ),
    keyboard_layout: $( "#keyboard_layout" ),
    f_canvas_holder: $( '#finger_canvas_holder' ),
    f_span_holder: $("#fin_spans"),
    backlit: $( '.backlit' ),
    s_block: $( '#saved_block' ),

    right_shift: $( "#shift_right" ),
    left_shift: $( "shift_left" ),

    course_time: $( '#course_time' ),
    free_time: $("#free_course_time"),

    custom_time: $("#custom_course_time"),
    custom_duration: $("#custom_course_duration"),

    cd_ph: $(".custom_duration_placeholder"),
    cd_easy_ph: $(".custom_duration_easy_placeholder"),
    cd_medium_ph: $(".custom_duration_medium_placeholder"),
    cd_hard_ph: $(".custom_duration_hard_placeholder"),

    pro_label: $(".pro-label"),

    nav_bar: $("#hotcold-navigation-bar"),

    fs_toggle: $("#fullscreen-toggle"),
    web_home: $("#web-home"),
    
    canvas_a: $( '#a' ),
    canvas_b: $( '#b' ),
    c_div: $( "#c" ),
    c_section: $(".c_section"),

    scroll_thumb: $("::-webkit-scrollbar-thumb"),
    scroll_bar: $("::-webkit-scrollbar"),

    dtp: $( '#day_theme_preview' ),
    ntp: $( '#night_theme_preview' ),

    pause_button: $("#pause_button"),
    resume_button: $("#resume_button"),

    completed_button: $("#completed_button"),
    completed_div: $("#completed"),

    redo_course: $( '#redo_button' ),
    abort: $( '#abort_button' ),

    custom_lesson: $( '#custom_lesson_input' ),
    char_length: $( '#total_characters' ),

    no_input: $( '#no_input_error' ),
    cli: $( '#custom_lesson_input' ),
    clear_cli_input: $("#clear_custom_lesson_input"),
    

    prepare_lesson: $( '#custom_lesson_launch' ),
    

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
