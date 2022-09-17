import { ViewLink } from "@/components/admin/ViewLink";
import { Create } from "@/containers/admin/Create";
import { List } from "@/containers/admin/List";
import { Update } from "@/containers/admin/Update";
import { useAccount } from "@/hooks/use-account";
import { Layout } from "@/layouts/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SettingsList() {
    const router = useRouter()
    const { view } = router.query

    const account = useAccount()

    const [section, setSection] = useState<"list" | "create" | "update">("list")

    useEffect(() => {
        if (view === "list" || view === "create" || view === "update") {
            setSection(view)
        }
    }, [view])

    return (
        <Layout mode="auth">
            {(!account.isSuccess || !account.data.isAdmin) ? (
                <div className="h-screen"></div>
            ) : (
                <div className="px-4 md:px-10 xl:px-20 py-12 dark:bg-neutral-900">
                    <h3 className="text-2xl mb-6">Administrator: {account.data.email}</h3>

                    <div className="flex pt-2 pb-12 space-x-4 items-center justify-center font-bold">
                        <ViewLink view="Create" active={view === "create"} />
                        <ViewLink view="List" active={view === "list"} />
                        <ViewLink view="Update" active={view === "update"} disabled />
                    </div>

                    {section === "create" ? <Create /> : section === "update" ? <Update /> : <List />}

                </div>
            )}
        </Layout>
    )
}
