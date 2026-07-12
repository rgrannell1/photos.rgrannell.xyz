

TASK-1:
Right click on an album currently opens it, but not in a new tab. It would be better to support opening in a new tab.

TASK-2:
When videos, but not photos are present for a things page, show only the videos section. E.g https://photos.rho.ie/#/thing/place:7

I think similar logic is in place already for the videos section.

Task-3:
Only show the recap of the year on when the album view is unfiltered; not when filtering by country.

Task-4:
Ensure that the album banner has a blurry pre-render, as on the about page. Crucially, check a higher resolution mosaic is rendered (this should exist in ~/Code/mirror) but only for albums, album, and about banner images. Make sure about, album banners, and the obverall albums banner have these better mosiacs too.

Task-5:
We have a bird checklist. I want alternating bands of darkened and normal year text colour by year, to help deliniate which birds where seen in which years.


---

Plan-1: life list

The checklist feature is good but a bit clinical. I'd like to rebrand to life list, which
tells more of a story of what I've seen and have yet to see

Data:
- Irish regulars
- Irish rare (migratory and oddity birds that turn up here)
- Our triples

We gain the concept of a nemesis species

I've photographed <wild species> in Ireland since <first entry>; Ireland regularily records about <z>.

## Birds | Mammals

```
#1 <best photo of bird> Kingfisher [tags]	May 2026
...
```

Tags will include [scarce] and [nemesis]; the first derived from data

Task P1.1:
Find data sources for regular and irregular bird species
Find data sources equivalent for mammals

Task P1.2
Label eurasian otters, little and cattle egrets, cookoos, and kingfishers as nemesis species. Add entries in things.toml, and add new species information if one is missing.

TASK P1.3 
Rename the pages and labels in the UI from checklist to life list.

TASK P1.4:
Improve the rendering of the checklist. Show a photo per bird or irish mammal observation

TASK P1.5:
Add a pokemon-style mystery bird logo for nemesis birds currently unphotographed at the bottom of the list. 

TASK P1.6
Add a `nemesis` tag or `scarce` tag next to relevant birds

Plan-2: Subject Bounds

