import { useState } from "react"
import { Banner } from "./Banner"
import { Nav } from "./Nav"
import { Sidebar } from "./Sidebar"

export function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <header className="flex flex-col md:flex-col-reverse">
            <Nav toggleSidebar={() => setSidebarOpen(s => !s)} />
            <Banner />
            <Sidebar open={sidebarOpen} toggleSidebar={() => setSidebarOpen(s => !s)} />
        </header>
    )
}
