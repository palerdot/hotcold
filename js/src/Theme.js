var Theme = {

    current: "night",

    gross_speed_color: "#FF9900",
    net_speed_color: "#00CC00",
    timer_color: "#BD9C59",
    accuracy_color: "#0066FF",
    completed_color: "#CC3300",

    day: {
        body_bg: "#F7F7F7",
        body_text_color: "#777777",
        
        canvas_border: "#C2C2C2",
        canvas_normal_line: "#DEDEDE",
        canvas_ref_line: "#ACACAC",

        saved_block: "#BDBDBD",
        text_color: "#777777",

        scroll_thumb_color: "#000000",
        scroll_bg_color: "#EDEDED"
    },

    night: {
        body_bg: "#282828",
        body_text_color: "#999999",

        canvas_border: "#555555",
        canvas_normal_line: "#555555",
        canvas_ref_line: "#BFBFBF",

        saved_block: "#454545",
        text_color: "#999999",

        scroll_thumb_color: "#555555",
        scroll_bg_color: "#222222"
    }

};

module.exports = Theme;