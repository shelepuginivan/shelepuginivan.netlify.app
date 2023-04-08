import blog from '@/assets/blog.jpg'
import contacts from '@/assets/contacts.jpg'
import gallery from '@/assets/gallery.jpg'
import projects from '@/assets/projects.jpg'
import AboutMe from '@/components/AboutMe/AboutMe'
import ContentCard from '@/components/ContentCard/ContentCard'
import Container from '@/ui/Container/Container'
import ResponsiveGrid from '@/ui/ResponsiveGrid/ResponsiveGrid'

export default function Home() {
	return (
		<main>
			<AboutMe/>
			<Container>
				<ResponsiveGrid>
					<ContentCard href='/projects' title='Проекты' backgroundImage={projects} />
					<ContentCard href='/blog' title='Блог' backgroundImage={blog} />
					<ContentCard href='/gallery' title='Галерея' backgroundImage={gallery} />
					<ContentCard href='/contacts' title='Контакты' backgroundImage={contacts} />
				</ResponsiveGrid>
			</Container>
		</main>
	)
}
