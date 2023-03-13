use std::sync::Once;

use tauri::{GlobalShortcutManager, Manager, Window, Wry};

static INIT: Once = Once::new();

#[cfg(target_os = "macos")]
use crate::macspot::{
    hide_macspot, init_macspot, position_window_at_the_center_of_the_monitor_with_cursor,
    show_macspot,
};

#[tauri::command]
pub fn init_spotlight_window(window: Window<Wry>) {
    INIT.call_once(|| {
        register_shortcut(&window);

        #[cfg(target_os = "macos")]
        init_macspot(window.clone());

        show_spotlight(window);
    });
}

#[tauri::command]
pub fn show_spotlight(window: Window<Wry>) {
    #[cfg(target_os = "macos")]
    show_macspot(window.clone());

    window.set_focus().unwrap();
}

#[tauri::command]
pub fn hide_spotlight(window: Window<Wry>) {
    if window.is_visible().unwrap() {

        #[cfg(target_os = "macos")]
        hide_macspot(window.clone());

        window.hide().unwrap();
    }
}

fn register_shortcut(window: &Window<Wry>) {
    let window = window.to_owned();
    let mut shortcut_manager = window.app_handle().global_shortcut_manager();

    shortcut_manager
        .register("CmdOrControl+Shift+G", move || {

            #[cfg(target_os = "macos")]
            position_window_at_the_center_of_the_monitor_with_cursor(&window);
            
            if window.is_visible().unwrap() {
                hide_spotlight(window.clone());
            } else {
                show_spotlight(window.clone());
            };
        })
        .unwrap();
}
