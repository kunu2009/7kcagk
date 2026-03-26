import { Outlet, NavLink } from "react-router-dom";
import { Home, BookOpen, BrainCircuit, GraduationCap, FileText, Layers, PlaySquare } from "lucide-react";
import { cn } from "../lib/utils";

export default function Layout() {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/ca", icon: BookOpen, label: "Current Affairs" },
    { to: "/gk", icon: GraduationCap, label: "Static GK" },
    { to: "/quiz", icon: BrainCircuit, label: "Practice" },
    { to: "/flashcards", icon: Layers, label: "Flashcards" },
    { to: "/reels", icon: PlaySquare, label: "Quick Facts" },
    { to: "/syllabus", icon: FileText, label: "Syllabus" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 md:pb-0 md:pl-64">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-white border-r border-slate-200 z-50">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">MHCET Prep '26</h1>
          <p className="text-xs text-slate-500 mt-1">5-Year LLB Aspirants</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold text-indigo-700">MHCET Prep '26</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav (Scrollable if too many items) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex overflow-x-auto pb-safe z-50 hide-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center min-w-[72px] py-3 gap-1 transition-colors flex-shrink-0",
                isActive ? "text-indigo-700" : "text-slate-500 hover:text-slate-900"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive && "fill-indigo-100")} />
                <span className="text-[10px] font-medium truncate w-full text-center px-1">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
