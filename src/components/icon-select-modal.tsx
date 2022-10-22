import { ActionIcon, Button, Center, Group, MantineSize, Modal, ScrollArea, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { TablerIconComponent } from "./tablerIcon";

interface IconSelectModalProps {
	opened: boolean;
	close: () => void;
	callback: (icon: IconType) => void;
}

export const IconSelectModal = ({ opened, close, callback }: IconSelectModalProps) => {
	const { data: icons } = useIconsQuery();
	const [category, setCategory] = useState<string>();
	const [search, setSearch] = useState<string>();
	const [stroke, setStroke] = useState<number>(1.5);
	const filtered: IconType[] = useMemo(() =>
		(icons ?? []).filter(icon => (!category || icon.category === category) &&
			(
				!search ||
				search === "" ||
				icon.tags.some(x => x.toLowerCase().startsWith(search.trim().toLowerCase())) ||
				icon.name.replace('Icon', '').toLowerCase().includes(search.trim().toLowerCase()))),
		[search, category, icons])


	const [width, setWidth] = useState<number>();
	const [page, setPage] = useState<number>(1);
	const [items, { append, setState }] = useListState<IconType>([]);
	const { data: categories } = useIconCategoriesQuery();
	const ref = useRef<HTMLDivElement | null>(null);

	const nextPage = () => {
		if (!icons) return;

		append(...filtered.slice(page * 100, (page + 1) * 100));
		setPage(p => p + 1)
	}

	const onClose = () => {
		close();
		setCategory(undefined);
		setSearch(undefined)
		setState((icons ?? []).slice(0, 100));
		setPage(1);
	}

	useEffect(() => {
		if (!ref.current) return;
		const itemsPerRow = Math.floor((ref.current.offsetWidth - 44) / (44 + 8));
		setWidth(itemsPerRow * (44 + 8) + 44);
	}, [ref])

	useEffect(() => {
		if (!icons) return;
		append(...filtered.slice(0, 100));
		setPage(1);

		return () => { setState([]); setPage(0) };
	}, [category, search, icons?.length]);

	return <Modal size="xl" opened={opened} onClose={onClose} title={<Title order={3}>Icon auswählen</Title>}>
		<Stack>
			<Group position="apart">
				<TextInput data-autofocus description="Icons durchsuchen" placeholder="Suchen..." value={search} onChange={(ev: ChangeEvent<HTMLInputElement>) => setSearch(ev.currentTarget.value)} />
				<Group>
					<Select
						description="Kategorie auswählen"
						placeholder="Kategorie auswählen"
						data={categories ?? []}
						clearable
						searchable
						value={category}
						onChange={(v) => setCategory(v ?? undefined)}
					/>
					<Select
						description="Stroke auswählen"
						placeholder="Pick one"
						data={[
							{ value: "xs", label: 'Klein' },
							{ value: 'sm', label: 'Mittel Klein' },
							{ value: 'md', label: 'Normal' },
							{ value: 'lg', label: 'Mittel Gross' },
							{ value: 'xl', label: 'Gross' },
						]}
						value={getStrokeByNumber(stroke)}
						onChange={v => setStroke(v ? strokeWidths[v as MantineSize] : 1.5)}
					/>
				</Group>
			</Group>
			<ScrollArea style={{ height: "500px" }} ref={ref}>
				<Stack>
					{filtered.length >= 1 ? <><Center >
						<div style={{ display: "flex", justifyContent: "start", flexWrap: "wrap", gap: 8, width }}>
							{items?.map(icon =>
								<ActionIcon key={icon.name} variant="default" size="xl" onClick={() => { onClose(); callback(icon); }}>
									<TablerIconComponent size={24} stroke={stroke} name={icon.react.replace('Icon', '')} />
								</ActionIcon>
							)}
						</div>

					</Center>
						<Center>
							{filtered.length > (items?.length ?? 0) ? <Button variant="subtle" color="gray" onClick={nextPage}>Mehr laden</Button> : null}
						</Center></> : <Text align="center">Es wurden keine Icons gefunden!</Text>}
				</Stack>
			</ScrollArea>

			<Group position="right">
				<Button variant="subtle" color="gray" onClick={onClose}>Abbrechen</Button>
			</Group>
		</Stack>
	</Modal>
}

const strokeWidths: Record<MantineSize, number> = {
	xs: 1,
	sm: 1.25,
	md: 1.5,
	lg: 1.75,
	xl: 2
};

const getStrokeByNumber = (value: number) => {
	return Object.entries(strokeWidths).find(([k, v]) => value === v)?.[0] ?? 'md';
}

export type IconType = {
	name: string;
	tags: string[];
	version: string;
	react: string;
	category: string;
}

const fetchIcons = async (): Promise<IconResponseType[]> => (await fetch('https://tabler-icons.io/icons.json')).json();

const useIconsQuery = () => useQuery(['icons'], fetchIcons, {
	select(data) {
		return data.map(({ n, t, v, r, c }) => ({
			name: n,
			tags: t.split(' '),
			version: v,
			react: r,
			category: c
		} as IconType))
	},
	retry: false,
	refetchOnWindowFocus: false
})

const useIconCategoriesQuery = () => useQuery(['icons'], fetchIcons, {
	select(data) {
		return data.reduce((p: string[], { c }) => {
			if (!p.includes(c) && c?.length >= 1) p.push(c)
			return p;
		}, [])
	},
	retry: false,
	refetchOnWindowFocus: false
})


type IconResponseType = {
	n: string;
	t: string;
	v: string;
	r: string;
	c: string;
}